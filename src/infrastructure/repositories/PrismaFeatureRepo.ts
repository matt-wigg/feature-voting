import { prisma } from "../db/prisma";
import type { FeatureRepo } from "@/domain/ports/FeatureRepo";
import type { Feature } from "@/domain/entities/Feature";
import type { Prisma } from "@prisma/client";

export const PrismaFeatureRepo: FeatureRepo = {
  async create({ title, description, authorId }) {
    // Use the unchecked path so we can set authorId scalar directly
    const f = await prisma.feature.create({
      data: {
        title,
        description,
        authorId: authorId ?? null,
      },
    });

    const count = await prisma.vote.count({ where: { featureId: f.id } });

    const result: Feature = {
      id: f.id,
      title: f.title,
      description: f.description,
      status: f.status as Feature["status"],
      votes: count,
      authorId: f.authorId ?? undefined,
      createdAt: f.createdAt,
    };
    return result;
  },

  async get(id, userId) {
    if (userId) {
      // When userId is present, include filtered votes so we can compute hasVoted.
      type RowWithVotes = Prisma.FeatureGetPayload<{
        include: {
          _count: { select: { votes: true } };
          votes: true; // votes array is present in this branch
        };
      }>;

      const row = (await prisma.feature.findUnique({
        where: { id },
        include: {
          _count: { select: { votes: true } },
          votes: { where: { userId } },
        },
      })) as RowWithVotes | null;

      if (!row) return null;

      const result: Feature = {
        id: row.id,
        title: row.title,
        description: row.description,
        status: row.status as Feature["status"],
        votes: row._count.votes,
        hasVoted: row.votes.length > 0,
        authorId: row.authorId ?? undefined,
        createdAt: row.createdAt,
      };
      return result;
    } else {
      // No userId: don't include votes; hasVoted defaults to false.
      type RowNoVotes = Prisma.FeatureGetPayload<{
        include: {
          _count: { select: { votes: true } };
        };
      }>;

      const row = (await prisma.feature.findUnique({
        where: { id },
        include: {
          _count: { select: { votes: true } },
        },
      })) as RowNoVotes | null;

      if (!row) return null;

      const result: Feature = {
        id: row.id,
        title: row.title,
        description: row.description,
        status: row.status as Feature["status"],
        votes: row._count.votes,
        hasVoted: false,
        authorId: row.authorId ?? undefined,
        createdAt: row.createdAt,
      };
      return result;
    }
  },

  async list({ sort = "top", userId }) {
    const orderBy: Prisma.FeatureOrderByWithRelationInput =
      sort === "new"
        ? { createdAt: "desc" }
        : sort === "trending"
          ? { updatedAt: "desc" }
          : { updatedAt: "desc" };

    if (userId) {
      // With userId: include filtered votes; TypeScript knows rows have votes[]
      type RowWithVotes = Prisma.FeatureGetPayload<{
        include: {
          _count: { select: { votes: true } };
          votes: true;
        };
      }>;

      const rows = (await prisma.feature.findMany({
        orderBy,
        include: {
          _count: { select: { votes: true } },
          votes: { where: { userId } },
        },
        take: 100,
      })) as RowWithVotes[];

      const results: Feature[] = rows.map((f) => ({
        id: f.id,
        title: f.title,
        description: f.description,
        status: f.status as Feature["status"],
        votes: f._count.votes,
        hasVoted: f.votes.length > 0,
        authorId: f.authorId ?? undefined,
        createdAt: f.createdAt,
      }));

      return results;
    } else {
      // Without userId: no votes relation included
      type RowNoVotes = Prisma.FeatureGetPayload<{
        include: {
          _count: { select: { votes: true } };
        };
      }>;

      const rows = (await prisma.feature.findMany({
        orderBy,
        include: {
          _count: { select: { votes: true } },
        },
        take: 100,
      })) as RowNoVotes[];

      const results: Feature[] = rows.map((f) => ({
        id: f.id,
        title: f.title,
        description: f.description,
        status: f.status as Feature["status"],
        votes: f._count.votes,
        hasVoted: false,
        authorId: f.authorId ?? undefined,
        createdAt: f.createdAt,
      }));

      return results;
    }
  },

  async updateStatus(id, status) {
    const f = await prisma.feature.update({
      where: { id },
      data: { status: status as any },
    });

    const count = await prisma.vote.count({ where: { featureId: id } });

    const result: Feature = {
      id: f.id,
      title: f.title,
      description: f.description,
      status: f.status as Feature["status"],
      votes: count,
      authorId: f.authorId ?? undefined,
      createdAt: f.createdAt,
    };
    return result;
  },
};
