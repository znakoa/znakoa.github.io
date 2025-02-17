import React from "react";
import Project from "./Project";
import Translate from "@docusaurus/Translate";
const Projects = () => {
  const works = [
    {
      stack: ["Vue3", "Element-plus", "BPMN"],
      description:
        "信息化平台是化工企业的重要工具，帮助企业进行信息采集、信息管理、信息和数据统计等，为员工提供高效、便捷的信息采集、信息和数据统计等。",
      title: "信息化平台",
      github: "https://github.com/HaochenQ/React-Furniture-Store",
      url: "https://cozyspace.haochenqi.com/",
      image: "img/Snipaste2.png",
      index: 0,
    },

    {
      stack: ["Vue3", "Element-plus"],
      description:
        "信息化平台-app是一款基于混合开发-JSBridge开发的移动端应用，主要功能包括：用户登录、信息采集、信息管理、信息和数据统计作业票等",
      title: "信息化平台-app(钥安全)",
      github: "https://github.com/HaochenQ/React-Furniture-Store",
      url: "https://recipe-app.haochenq.vercel.app/",
      image: "img/Snipaste3.png",
      index: 1,
    },
    {
      stack: ["Vue3", "Element-plus"],
      description:
        "智能收发卡管理后台系统是一款基于开源后台管理系统进行二次开发的应用，旨在提供高效、便捷的收发卡管理功能。系统集成了多种实用组件，通过封装组件库提升开发效率，确保系统的可维护性和可扩展性。",
      title: "智能收发卡管理后台系统",
      github: "https://github.com/HaochenQ/Django-blog",
      url: "https://quiet-escarpment-41189.herokuapp.com/",
      image: "img/Snipaste4.png",
      index: 2,
    },
    {
      stack: ["Vue3", "Element-plus", "BPMN"],
      description:
        "企业内部使用,针对性开发功能,旨在帮助企业优化资源管理、提升运营效率和增强决策能力。通过整合企业内部的各个业务模块，ERP系统提供了全面的数据分析和实时信息，支持企业在复杂的业务环境中进行有效的管理。",
      title: "ERP管理系统(企业自用)",
      github: "https://github.com/HaochenQ/DoneWithIt",
      url: "https://expo.io/@haochen/projects/DoneWithIt",
      image: "img/Snipaste5.png",
      index: 3,
    },
    {
      stack: ["react", "node", "zustand","ECharts" ,"DataV"],
      description:
          "基于 React、zustand、DataV、ECharts 框架的 \" 数据大屏项目 \"。支持数据动态刷新渲染、屏幕适配、数据请求模拟、局部样式、图表自由替换/复用等功能。 使用了函数式编程",
      title: "数据大屏项目",
      github: "https://github.com/HaochenQ/DoneWithIt",
      url: "https://expo.io/@haochen/projects/DoneWithIt",
      image: "img/snipaste1.png",
      index: 4,
    },
  ];
  return (
    <div className="projects">
      <h1 className="recent-projects">
        <Translate>最近项目</Translate>
      </h1>
      <div className="underline"></div>
      <div className="section-center projects-center">
        {works.map(
          ({ description, stack, title, github, url, image, index }) => (
            <Project
              stack={stack}
              key={index}
              description={description}
              title={title}
              url={url}
              github={github}
              image={image}
              index={index}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Projects;
