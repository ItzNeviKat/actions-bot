import Router, { RouterContext } from '@koa/router';
import * as crypto from 'crypto';

import { sendMessage } from './vk';

export const router = new Router();

router.post('/payload', async (context: RouterContext) => {
  const signature: string | undefined = context.headers[
    'x-hub-signature-256'
  ] as string | undefined;

  const resultSignature: string =
    'sha256=' +
    crypto
      .createHmac('sha256', 'VzHcuV9L-4i6xYe')
      .update(JSON.stringify(context.request.body))
      .digest('hex');

  if (signature !== resultSignature)
    return (context.body = 'Invalid signature');

  const body: Record<string, any> = context.request.body;

  if (body.action === 'created') {
    await sendMessage(`
      📖 Репозиторий ${body.repository.name}

      🎬 Запущен Github Action с именем ${body.check_run.name} (id:${body.check_run.id})
      📎 Ссылка - ${body.check_run.details_url}
    `);
  } else if (body.action === 'completed') {
    if (body.check_run.conclusion === 'success') {
      await sendMessage(`
      📖 Репозиторий ${body.repository.name}

      🤙 Успешно завершён Github Action с именем ${body.check_run.name} (id:${
        body.check_run.id
      })
      ⏰ Длительность - ${Math.round(
        (new Date(body.check_run.completed_at).getTime() -
          new Date(body.check_run.started_at).getTime()) /
          1000
      )} секунд
      📎 Ссылка - ${body.check_run.details_url}
    `);
    } else {
      await sendMessage(`
      📖 Репозиторий ${body.repository.name}

      ❗️ С ошибкой завершён Github Action с именем ${
        body.check_run.name
      } (id:${body.check_run.id})
      ⏱ Длительность - ${Math.round(
        (new Date(body.check_run.completed_at).getTime() -
          new Date(body.check_run.started_at).getTime()) /
          1000
      )} секунд
      📎 Ссылка - ${body.check_run.details_url}

      @all
    `);
    }
  }

  return (context.body = 'ok');
});
