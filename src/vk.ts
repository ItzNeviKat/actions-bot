import { VK } from 'vk-io';

export const vk = new VK({
  token:
    '041fac0951b36ee8fa4e01761b6700b136e32fb0a721988e600dac1e9b79446451dc495062f8f504ecd42'
});

export function sendMessage(message: string): Promise<number> {
  return vk.api.messages.send({
    peer_id: 2000000003,
    random_id: 0,
    message
  });
}
