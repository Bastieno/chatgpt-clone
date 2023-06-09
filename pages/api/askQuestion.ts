// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import query from '../../lib/queryApi';
import { adminDb } from '../../firebaseAdmin';

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { queryText, model, session, chatId } = req.body;

  const response = await query({ queryText, model });

  const message = {
    text: response || 'ChatGPT is not able to find an answer for that',
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar: 'https://links.papareact.com/89k',
    },
  };

  await adminDb
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message);

  // ChatGPT query
  res.status(200).json({ answer: message.text });
}
