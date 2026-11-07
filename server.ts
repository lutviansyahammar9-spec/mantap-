import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Backend API route for checking game nickname (Free Fire)
  app.post('/api/check-nickname', async (req, res) => {
    try {
      const { id, game_code = 'freefire', api_key } = req.body;

      if (!id || String(id).trim() === '') {
        return res.status(400).json({
          status: false,
          message: 'User ID tidak boleh kosong',
        });
      }

      const trimmedId = String(id).trim();
      const apiKey = api_key || process.env.KOKINPAY_API_KEY || '';

      // 1. If API Key is provided or present in environment, call Kokinpay API
      if (apiKey) {
        try {
          const kokinResponse = await fetch('https://api.kokinpay.com/v1/check-nickname', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              api_key: apiKey,
              id: trimmedId,
              game_code: game_code,
            }),
          });
          const kokinData = await kokinResponse.json();

          if (kokinData && (kokinData.status === true || kokinData.success === true)) {
            const nickname =
              kokinData.data?.nickname ||
              kokinData.data?.username ||
              kokinData.data?.name ||
              kokinData.nickname ||
              kokinData.username ||
              kokinData.name;
            if (nickname) {
              return res.json({
                status: true,
                source: 'kokinpay',
                nickname: nickname,
                id: trimmedId,
                game_code,
              });
            }
          }
        } catch (err: any) {
          console.warn('Kokinpay API call error:', err?.message);
        }
      }

      // 2. Query official live Free Fire database in parallel for ultra-fast real nickname resolution
      const lookupPromises: Promise<{ nickname: string; source: string }>[] = [];

      // Provider A: Live GoPay Garena Free Fire Gateway
      lookupPromises.push(
        (async () => {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 2600);
          try {
            const response = await fetch(
              `https://gopay.co.id/games/v1/order/prepare/FREEFIRE?userId=${encodeURIComponent(trimmedId)}`,
              {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                  'Accept': 'application/json',
                },
                signal: controller.signal,
              }
            );
            clearTimeout(timer);
            if (response.ok) {
              const data = await response.json();
              if (data && data.data) {
                return { nickname: String(data.data), source: 'garena_official' };
              }
            }
          } catch {
            clearTimeout(timer);
          }
          throw new Error('Not found on Provider A');
        })()
      );

      // Provider B: Live backup Garena Free Fire ID validator
      lookupPromises.push(
        (async () => {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 2600);
          try {
            const response = await fetch(
              `https://api.isan.eu.org/nickname/ff?id=${encodeURIComponent(trimmedId)}`,
              {
                signal: controller.signal,
              }
            );
            clearTimeout(timer);
            if (response.ok) {
              const data = await response.json();
              if (data && data.name) {
                return { nickname: String(data.name), source: 'garena_official' };
              }
            }
          } catch {
            clearTimeout(timer);
          }
          throw new Error('Not found on Provider B');
        })()
      );

      try {
        const result = await Promise.any(lookupPromises);
        return res.json({
          status: true,
          source: result.source,
          nickname: result.nickname,
          id: trimmedId,
          game_code,
        });
      } catch {
        // All live providers reported not found
      }

      // 3. Fallback: Check if Kokinpay has open record
      try {
        const kokinResponse = await fetch('https://api.kokinpay.com/v1/check-nickname', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_key: apiKey,
            id: trimmedId,
            game_code: game_code,
          }),
        });
        const kokinData = await kokinResponse.json();

        if (kokinData && (kokinData.status === true || kokinData.success === true)) {
          const nickname =
            kokinData.data?.nickname ||
            kokinData.data?.username ||
            kokinData.data?.name ||
            kokinData.nickname ||
            kokinData.username ||
            kokinData.name;
          if (nickname) {
            return res.json({
              status: true,
              source: 'kokinpay',
              nickname: nickname,
              id: trimmedId,
              game_code,
            });
          }
        }
      } catch {
        // ignore
      }

      // If ID does not exist in Garena database
      return res.status(404).json({
        status: false,
        message: `ID ${trimmedId} tidak ditemukan di server Free Fire. Pastikan UID kamu sudah benar.`,
        id: trimmedId,
        game_code,
      });
    } catch (err: any) {
      console.error('Server error check-nickname:', err);
      return res.status(500).json({
        status: false,
        message: 'Terjadi kesalahan pada server saat mengecek ID',
      });
    }
  });

  // Support GET request as well
  app.get('/api/check-nickname', async (req, res) => {
    const id = req.query.id as string;
    const game_code = (req.query.game_code as string) || 'freefire';
    if (!id) {
      return res.status(400).json({ status: false, message: 'Parameter id wajib diisi' });
    }

    const trimmedId = String(id).trim();

    try {
      const gopayRes = await fetch(
        `https://gopay.co.id/games/v1/order/prepare/FREEFIRE?userId=${encodeURIComponent(trimmedId)}`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/json',
          },
        }
      );
      if (gopayRes.ok) {
        const gopayData = await gopayRes.json();
        if (gopayData && gopayData.data) {
          return res.json({
            status: true,
            source: 'garena_official',
            nickname: gopayData.data,
            id: trimmedId,
            game_code,
          });
        }
      }
    } catch {
      // fallback
    }

    try {
      const isanRes = await fetch(
        `https://api.isan.eu.org/nickname/ff?id=${encodeURIComponent(trimmedId)}`
      );
      if (isanRes.ok) {
        const isanData = await isanRes.json();
        if (isanData && isanData.name) {
          return res.json({
            status: true,
            source: 'garena_official',
            nickname: isanData.name,
            id: trimmedId,
            game_code,
          });
        }
      }
    } catch {
      // fallback
    }

    return res.status(404).json({
      status: false,
      message: `ID ${trimmedId} tidak ditemukan di server Free Fire`,
      id: trimmedId,
      game_code,
    });
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // In development, hook Vite's connect instance as middleware
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`> Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});
