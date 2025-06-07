type GithubSearchResponse = {
  items: GithubSearchResponseItem[];
};

type GithubSearchResponseItem = {
  full_name: string;
  stargazers_count: number;
  license: {
    name?: string;
  };
  xhtml_url: string;
};
