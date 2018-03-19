require "json"

module Github
  class Repos
    JSON.mapping({
      total_count:        Int32,
      incomplete_results: Bool,
      items:              Array(Repo),
    })
  end

  class Repo
    JSON.mapping({
      id:                Int32,
      name:              String,
      full_name:         String,
      owner:             Owner,
      private:           Bool,
      html_url:          String,
      description:       String?,
      fork:              Bool,
      url:               String,
      forks_url:         String,
      keys_url:          String,
      collaborators_url: String,
      teams_url:         String,
      hooks_url:         String,
      issue_events_url:  String,
      events_url:        String,
      assignees_url:     String,
      branches_url:      String,
      tags_url:          String,
      blobs_url:         String,
      git_tags_url:      String,
      git_refs_url:      String,
      trees_url:         String,
      statuses_url:      String,
      languages_url:     String,
      stargazers_url:    String,
      contributors_url:  String,
      subscribers_url:   String,
      subscription_url:  String,
      commits_url:       String,
      git_commits_url:   String,
      comments_url:      String,
      issue_comment_url: String,
      contents_url:      String,
      compare_url:       String,
      merges_url:        String,
      archive_url:       String,
      downloads_url:     String,
      issues_url:        String,
      pulls_url:         String,
      milestones_url:    String,
      notifications_url: String,
      labels_url:        String,
      releases_url:      String,
      deployments_url:   String,
      created_at:        Time,
      updated_at:        Time,
      pushed_at:         Time,
      git_url:           String,
      ssh_url:           String,
      clone_url:         String,
      svn_url:           String,
      homepage:          String?,
      size:              Int32,
      stargazers_count:  Int32,
      watchers_count:    Int32,
      language:          String,
      has_issues:        Bool,
      has_projects:      Bool,
      has_downloads:     Bool,
      has_wiki:          Bool,
      has_pages:         Bool,
      forks_count:       Int32,
      mirror_url:        String?,
      archived:          Bool,
      open_issues_count: Int32,
      license:           License?,
      forks:             Int32,
      open_issues:       Int32,
      watchers:          Int32,
      default_branch:    String,
      permissions:       Permissions,
      score:             Float64,
    })

    def license_name
      @license.try do |license|
        if license.name
          license.name
        else
          ""
        end
      end
    end
  end

  class Owner
    JSON.mapping({
      login:               String,
      id:                  Int32,
      avatar_url:          String,
      gravatar_id:         String,
      url:                 String,
      html_url:            String,
      followers_url:       String,
      following_url:       String,
      gists_url:           String,
      starred_url:         String,
      subscriptions_url:   String,
      organizations_url:   String,
      repos_url:           String,
      events_url:          String,
      received_events_url: String,
      type:                String,
      site_admin:          Bool,
    })
  end

  class License
    JSON.mapping({
      key:     String,
      name:    String,
      spdx_id: String?,
      url:     String?,
    })
  end

  class Permissions
    JSON.mapping({
      admin: Bool,
      push:  Bool,
      pull:  Bool,
    })
  end
end