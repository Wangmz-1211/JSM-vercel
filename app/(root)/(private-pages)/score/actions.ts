"use server";

import { auth } from "@/lib/auth";
import prisma from "../../api/lib/PrismaClient";
import { revalidatePath } from "next/cache";
import {
  vocabularyPart,
  grammarPart,
  readingPart,
  listeningPart,
} from "../../api/lib/ScoreCalculater";

export const deleteScore = async (formData: Record<string, any>) => {
  const { id } = formData;
  const session = await auth();
  if (!id || !session || !session.user || !session.user.email) return;

  await prisma.scores.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/score");
};

export const createScore = async (formData: Record<string, any>) => {
  const session = await auth();
  const { title } = formData;
  if (!title || !session || !session.user || !session.user.email) return;
  await prisma.scores.create({
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
};

export const updateScore = async (formData: Record<string, any>) => {
  const session = await auth();
  if (!session || !session.user || !session.user.email) return;
  if (formData.user_email !== session.user.email) return;
  const vocabulary = {
    v1: formData.v1,
    v2: formData.v2,
    v3: formData.v3,
    v4: formData.v4,
    v5: formData.v5,
    v6: formData.v6,
  };
  const grammar = {
    g7: formData.g7,
    g8: formData.g8,
    g9: formData.g9,
  };
  const reading = {
    r10: formData.r10,
    r11_1: formData.r11_1,
    r11_2: formData.r11_2,
    r12: formData.r12,
    r13: formData.r13,
    r14: formData.r14,
  };
  const listening = {
    l1: formData.l1,
    l2: formData.l2,
    l3: formData.l3,
    l4: formData.l4,
    l5: formData.l5,
  };
  const vocabulary_score = vocabularyPart(vocabulary);
  const grammar_score = grammarPart(grammar);
  const reading_score = readingPart(reading);
  const listening_score = listeningPart(listening);
  const total_score =
    vocabulary_score + grammar_score + reading_score + listening_score;
  const record = await prisma.scores.update({
    where: {
      id: formData.id,
      user_email: formData.user_email,
    },
    data: {
      vocabulary: vocabulary,
      grammar: grammar,
      reading: reading,
      listening: listening,
      vocabulary_score: vocabulary_score,
      grammar_score: grammar_score,
      reading_score: reading_score,
      listening_score: listening_score,
      total_score: total_score,
    },
  });
  revalidatePath("/score");
  return record;
};
