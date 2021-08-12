import { VK } from 'vk-io';
import { stripIndents } from 'common-tags';

export const vk = new VK({
  token: process.env.TOKEN
});

export function sendMessage(message: string): Promise<number> {
  return vk.api.messages.send({
    peer_id: 2000000003,
    random_id: 0,
    message: stripIndents(message)
  });
}
