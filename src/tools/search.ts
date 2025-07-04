import { z } from 'zod';
import { SearchParams, ToolResponse } from '@/types';
import axios from 'axios';

export const searchParams = {
  query: z.string().describe('搜索查询'),
  limit: z.number().optional().default(5).describe('返回结果数量限制'),
  language: z.string().optional().describe('编程语言'),
  stars: z.string().optional().describe('star 数筛选，如 >100'),
  forks: z.string().optional().describe('fork 数筛选，如 >50'),
  user: z.string().optional().describe('仓库所属用户'),
  topic: z.string().optional().describe('仓库主题标签'),
  created: z.string().optional().describe('创建时间筛选，如 >2023-01-01'),
  sort: z.enum(['stars', 'forks', 'updated']).optional().describe('排序字段'),
  order: z.enum(['desc', 'asc']).optional().describe('排序顺序'),
};

export async function search({
  query,
  limit,
  language,
  stars,
  forks,
  user,
  topic,
  created,
  sort,
  order,
}: any): Promise<ToolResponse> {
  // 拼接高级搜索参数到 q
  let q = query;
  if (language) q += ` language:${language}`;
  if (stars) q += ` stars:${stars}`;
  if (forks) q += ` forks:${forks}`;
  if (user) q += ` user:${user}`;
  if (topic) q += ` topic:${topic}`;
  if (created) q += ` created:${created}`;

  try {
    const response = await axios.get('https://api.github.com/search/repositories', {
      params: {
        q,
        per_page: limit,
        ...(sort ? { sort } : {}),
        ...(order ? { order } : {}),
      },
      headers: { Accept: 'application/vnd.github+json' },
    });
    const items = response.data.items || [];
    const results = items.map(
      (repo: any, i: number) =>
        `${i + 1}. [${repo.full_name}](${repo.html_url})\n描述: ${repo.description || '无'}`,
    );
    return {
      content: [
        {
          type: 'text',
          text: `GitHub 上关于 "${q}" 的仓库：\n\n${results.join('\n\n')}`,
          _meta: {},
        },
      ],
      _meta: {},
    };
  } catch (e: any) {
    return {
      content: [
        {
          type: 'text',
          text: `搜索失败: ${e?.response?.data?.message || e.message}`,
          _meta: {},
        },
      ],
      _meta: {},
    };
  }
}
