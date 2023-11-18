"use server";

import { auth } from "@/lib/auth";
import prisma from "../../api/lib/PrismaClient";
import { revalidatePath } from "next/cache";

export const deleteScore = async (formData: FormData) => {
  const rawId = formData.get("id");
  if (!rawId) return;
  const id = rawId.toString();
  const session = await auth();
  if (!id || !session || !session.user || !session.user.email) return;

  await prisma.scores.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/score");
};

export const createScore = async (formData: FormData) => {
  const rawTitle = formData.get("title");
  if (!rawTitle) return;
  const title = rawTitle.toString();
  const session = await auth();
  if (!title || !session || !session.user || !session.user.email) return;
  const record = await prisma.scores.create({
    data: {
      v: 0,
      title: title,
      user_email: session.user.email,
      vocabulary: {
        v1: 0,
        v2: 0,
        v3: 0,
        v4: 0,
        v5: 0,
        v6: 0,
      },
      grammar: {
        g7: 0,
        g8: 0,
        g9: 0,
      },
      reading: {
        r10: 0,
        r11_1: 0,
        r11_2: 0,
        r12: 0,
        r13: 0,
        r14: 0,
      },
      listening: {
        l1: 0,
        l2: 0,
        l3: 0,
        l4: 0,
        l5: 0,
      },
      vocabulary_score: 0,
      grammar_score: 0,
      reading_score: 0,
      listening_score: 0,
      total_score: 0,
    },
  });
  revalidatePath("/score");
  console.log(record);
};
