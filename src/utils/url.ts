import type { CollectionEntry } from "astro:content";

/**
 * 根据文章 ID 获取正确的路径
 * 用于内部链接、导航等
 * @param post 文章对象
 * @returns 正确格式的路径
 */
export function getPostPath(post: CollectionEntry<"post">): string {
  const postId = post.id.startsWith("/") ? post.id.substring(1) : post.id;
  // 所有 post 统一带 `.html` 后缀，以保持与历史链接的向后兼容
  return `/${postId}.html`;
}

/**
 * 根据发布日期决定文章的规范 URL 格式
 * 用于 canonical 和外部链接
 * @param post 文章对象
 * @returns 规范化的 URL 路径
 */
export function getCanonicalUrl(post: CollectionEntry<"post">): string {
  // getPostPath 已返回以 `/` 开头的路径，交给 URL 构造器拼接可避免与
  // siteConfig.url 的结尾斜杠叠加出 `//` / `///` 这类畸形 canonical 地址。
  return new URL(getPostPath(post), import.meta.env.SITE).href;
}
