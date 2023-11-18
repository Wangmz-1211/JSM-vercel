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

export const updateScore = async (formData: FormData) => {
  const session = await auth();
  if (!session || !session.user || !session.user.email) return;
  const rawId = formData.get("id");
  const rawEmail = formData.get("user_email");
  if (!rawId || !rawEmail) return;
  const id = rawId.toString(),
    email = rawEmail.toString();
  if (email !== session.user.email) return;
  const vocabulary = {
    v1: parseInt(formData.get("v1")?.toString()!, 10),
    v2: parseInt(formData.get("v2")?.toString()!, 10),
    v3: parseInt(formData.get("v3")?.toString()!, 10),
    v4: parseInt(formData.get("v4")?.toString()!, 10),
    v5: parseInt(formData.get("v5")?.toString()!, 10),
    v6: parseInt(formData.get("v6")?.toString()!, 10),
  };
  const grammar = {
    g7: parseInt(formData.get("g7")?.toString()!, 10),
    g8: parseInt(formData.get("g8")?.toString()!, 10),
    g9: parseInt(formData.get("g9")?.toString()!, 10),
  };
  const reading = {
    r10: parseInt(formData.get("r10")?.toString()!, 10),
    r11_1: parseInt(formData.get("r11_1")?.toString()!, 10),
    r11_2: parseInt(formData.get("r11_2")?.toString()!, 10),
    r12: parseInt(formData.get("r12")?.toString()!, 10),
    r13: parseInt(formData.get("r13")?.toString()!, 10),
    r14: parseInt(formData.get("r14")?.toString()!, 10),
  };
  const listening = {
    l1: parseInt(formData.get("l1")?.toString()!, 10),
    l2: parseInt(formData.get("l2")?.toString()!, 10),
    l3: parseInt(formData.get("l3")?.toString()!, 10),
    l4: parseInt(formData.get("l4")?.toString()!, 10),
    l5: parseInt(formData.get("l5")?.toString()!, 10),
  };
  const vocabulary_score = vocabularyPart(vocabulary);
  const grammar_score = grammarPart(grammar);
  const reading_score = readingPart(reading);
  const listening_score = listeningPart(listening);
  const total_score =
    vocabulary_score + grammar_score + reading_score + listening_score;
  const record = await prisma.scores.update({
    where: {
      id: id,
      user_email: email,
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
