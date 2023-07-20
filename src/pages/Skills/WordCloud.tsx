import React from "react";

interface Props {
  data: { [key: string]: number };
}

import { Skill } from "interfaces";
import { sortSkills } from "utils/sortSkills";

export default function WordCloud(props: Props) {
  const skills: Skill[] = sortSkills(props.data);
  console.log(skills);
  return (
    <div className="cloud-wrapper">
      <ul
        className="cloud"
        role="navigation"
        aria-label="Webdev tag cloud"
        data-show-value="true"
      >
        {skills.map(function (skill) {
          const id = skill[0];
          const name = skill[1];
          const count = skill[2];
          const size = Math.log(count) + 1;
          return (
            <li
              key={id}
              data-weight={count > 25 ? `(${count})` : ""}
              style={{ "--size": size } as React.CSSProperties}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
