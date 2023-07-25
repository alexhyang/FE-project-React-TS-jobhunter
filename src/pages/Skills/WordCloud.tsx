import React from "react";

import { Skill } from "./interfaces";

export default function WordCloud(props: { data: Skill[] }) {
  const skills = props.data;
  console.log(skills);
  return (
    <div className="cloud-wrapper">
      <ul
        className="cloud"
        role="navigation"
        aria-label="Webdev tag cloud"
        data-show-value="true"
      >
        {skills.map(function (skill, index) {
          const size = Math.log(skill.count) + 1;
          return (
            <li
              key={index}
              data-weight={skill.count > 25 ? `(${skill.count})` : ""}
              style={{ "--size": size } as React.CSSProperties}
            >
              {skill.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
