import React from "react";
import starSvg from "../assets/star.svg";
import forkSvg from "../assets/fork.svg";
import watcherSvg from "../assets/watcher.svg";

type RepoBoxProps = {
  repo: Repo;
} & React.ComponentPropsWithoutRef<"div">;

export default function RepoBox({ className, repo }: RepoBoxProps) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      className={"box-wrapper col" + (className ? " " + className : "")}
    >
      <div className="repo-info">
        <div className="">
          <p className="repo-name">{repo.name}</p>
          <p className="user-name">{"@" + repo.owner.login}</p>
        </div>
        <img className="repo-avatar" src={repo.owner.avatar_url} alt="avatar" />
      </div>
      <div className="stats">
        <div className="stat">
          <img src={starSvg} className="stat-icon" alt="logo" />{" "}
          {repo.stargazers_count}
        </div>
        <div className="stat">
          <img src={watcherSvg} className="stat-icon" alt="logo" />
          {repo.watchers_count}
        </div>
        <div className="stat">
          <img src={forkSvg} className="stat-icon" alt="logo" />
          {repo.forks_count}
        </div>
      </div>
    </a>
  );
}
