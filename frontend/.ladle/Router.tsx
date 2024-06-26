import React from "react";

export const Link = (props: any) => {
  return <a {...props}>{props.children}</a>;
};

export const Navigate = (props: any) => {
  return <div />;
};

export const useNavigate = () => {
  const navigate = () => {};

  return navigate;
};

export const useRouterState = () => {
  return {
    location: {
      pathname: "/",
    },
  };
};
