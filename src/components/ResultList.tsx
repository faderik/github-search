import React from "react";
import RepoBox from "./RepoBox";
import UserBox from "./UserBox";
import Paginator from "./Paginator";

type ResultListProps = {
  type: string;
  repos: Repo[];
  users: User[];
  loading: boolean;
  error: string;
  currentPage: number;
  setCurrentPage: (state: number) => void;
  totalPage: number;
} & React.ComponentPropsWithoutRef<"div">;

export default function ResultList({
  type,
  users,
  repos,
  loading,
  error,
  currentPage,
  setCurrentPage,
  totalPage,
}: ResultListProps) {
  if (loading) {
    return <div className="info">Loading...</div>;
  }

  if (error !== "") {
    return <div className="error">{error}</div>;
  }

  if (!users || !repos) {
    return <div className="info">No result found.</div>;
  }

  if (type == "users" && users.length === 0) {
    return <div className="info">No result found.</div>;
  }

  if (type == "repositories" && repos.length === 0) {
    return <div className="info">No result found.</div>;
  }

  return (
    <>
      <div className="content">
        {type == "users"
          ? users?.map((user: User) => <UserBox key={user.id} user={user} />)
          : repos?.map((repo: Repo) => <RepoBox key={repo.id} repo={repo} />)}
      </div>
      <Paginator
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
      />
    </>
  );
}
