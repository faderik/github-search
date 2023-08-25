import React from "react";

type UserBoxProps = {
  user: User;
} & React.ComponentPropsWithoutRef<"div">;

export default function UserBox({ className, user }: UserBoxProps) {
  return (
    <a
      href={user.html_url}
      target="_blank"
      className={"box-wrapper" + (className ? " " + className : "")}
    >
      <img className="user-avatar" src={user.avatar_url} alt="avatar" />
      <div className="user-data">
        <p className="user-name">{user.login}</p>
        <p className="user-location">{`#${user.id}`}</p>
      </div>
    </a>
  );
}
