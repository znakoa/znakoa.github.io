import React from "react";

import useBaseUrl from "@docusaurus/useBaseUrl";
const Project = ({ description, title, github, stack, url, image, index }) => {
  return (
    <article className="work">
      <div className="work-img" >
        {image && <img src={useBaseUrl(image)} className="image" />}
        <div className="img-mask"></div>
      </div>
      <div className="work-info">
        <span className="work-number">0{index + 1}.</span>
        <h3>{title || "default title"}</h3>
        <p className="work-desc">{description}</p>
        <div className="work-stack mt-2">
          {stack.map((item, index) => {
            return <span key={index}>{item}</span>;
          })}
        </div>
        <div className="work-links">
          {/*<a href={github}>*/}
          {/*    2*/}
          {/*  /!*<FontAwesomeIcon icon={faGithub} className="work-icon" />*!/*/}
          {/*</a>*/}
          {/*<a href={url}>*/}
          {/*    2*/}
          {/*  /!*<FontAwesomeIcon icon={faExternalLinkAlt} className="work-icon" />*!/*/}
          {/*</a>*/}
        </div>
      </div>
    </article>
  );
};

export default Project;
