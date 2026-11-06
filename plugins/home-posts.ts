import type {Plugin} from '@docusaurus/types';

type BlogContent = {
  blogPosts: Array<{
    metadata: {
      title: string;
      description: string;
      date: Date | string;
      permalink: string;
      unlisted?: boolean;
      frontMatter: {draft?: boolean};
    };
  }>;
};

/** Reuse normalized dates, visibility and permalinks from the blog plugin. */
export default function homePosts(): Plugin {
  return {
    name: 'personal-blog-home',
    allContentLoaded({allContent, actions}) {
      const blog = allContent['docusaurus-plugin-content-blog']?.default as BlogContent | undefined;
      const posts = (blog?.blogPosts ?? [])
        .map(({metadata}) => metadata)
        .filter((post) => !post.unlisted && !post.frontMatter.draft)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((post) => ({
          title: post.title,
          description: post.description,
          date: new Date(post.date).toISOString().slice(0, 10),
          to: post.permalink,
        }));
      actions.setGlobalData({posts});
    },
  };
}
