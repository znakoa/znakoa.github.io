import React from "react";

import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import {MagicCard} from "@site/src/components/ui/magiccard";
// const features = [
//   {
//     Icon: FileTextIcon,
//     name: "Save your files",
//     description: "We automatically save your files as you type.",
//     href: "#",
//     cta: "Learn more",
//     className: "col-span-3 lg:col-span-1",
//     background: (
//         <Marquee
//             pauseOnHover
//             className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
//         >
//           {files.map((f, idx) => (
//               <figure
//                   key={idx}
//                   className={cn(
//                       "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
//                       "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
//                       "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
//                       "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
//                   )}
//               >
//                 <div className="flex flex-row items-center gap-2">
//                   <div className="flex flex-col">
//                     <figcaption className="text-sm font-medium dark:text-white ">
//                       {f.name}
//                     </figcaption>
//                   </div>
//                 </div>
//                 <blockquote className="mt-2 text-xs">{f.body}</blockquote>
//               </figure>
//           ))}
//         </Marquee>
//     ),
//   },
//   {
//     Icon: BellIcon,
//     name: "Notifications",
//     description: "Get notified when something happens.",
//     href: "#",
//     cta: "Learn more",
//     className: "col-span-3 lg:col-span-2",
//     background: (
//         <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
//     ),
//   },
//   {
//     Icon: Share2Icon,
//     name: "Integrations",
//     description: "Supports 100+ integrations and counting.",
//     href: "#",
//     cta: "Learn more",
//     className: "col-span-3 lg:col-span-2",
//     background: (
//         <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
//     ),
//   },
//   {
//     Icon: CalendarIcon,
//     name: "Calendar",
//     description: "Use the calendar to filter your files by date.",
//     className: "col-span-3 lg:col-span-1",
//     href: "#",
//     cta: "Learn more",
//     background: (
//         <Calendar
//             mode="single"
//             selected={new Date(2022, 4, 11, 0, 0, 0)}
//             className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
//         />
//     ),
//   },
// ];

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: InputIcon,
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description:
        "Get notified when someone shares a file or mentions you in a comment.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "col-span-3 lg:col-span-2",
  },
];
function Experience() {


  return (
    <section className="flex flex-col gap-4">
      <MagicCard
          className="cursor-pointer flex-col items-center justify-center  shadow-2xl p-6"
          gradientColor={"#43a249"}
      >
       <div>
         前端开发工程师
       </div>
        <div>
          🏢 公司：宁波文钥科技有限公司
        </div>
        <div>
          📅 时间: 2023-06 - 至今
        </div>

        <div>
          **职责**：
        </div>



        - **前端开发组长**：负责领导前端开发团队，分配任务并监督项目进度，确保项目按时交付。
        - **前端架构设计**：负责前端架构设计和技术选型，确保系统的稳定性和可扩展性。
        - **技术难点攻关**：解决项目中遇到的技术难点，提供高效的解决方案，提升团队整体技术水平。
        - **代码审核**：进行代码审核，确保代码质量和一致性，提升项目的可维护性。
        - **性能优化**：对前端项目进行性能优化，包括页面加载速度、资源压缩和缓存管理等，提升用户体验。
        - **跨部门协作**：与后端开发、设计和产品团队紧密合作，确保项目需求的准确理解和实现，推动项目顺利进行。
      </MagicCard>
      <MagicCard
          className="cursor-pointer flex-col items-center justify-center  shadow-2xl p-6"
          gradientColor={"#43a249"}
      >
        <div>
          ### 开发组员工-前端
        </div>
        <div>
          🏢 公司：中兴软件技术（南昌）有限公司
        </div>
        <div>
          📅 时间: 2022-06 - 2023-06
        </div>
        <div>
          **职责**：
        </div>

        - **前端网页构建**：根据 UI 设计稿，100% 还原前端页面，确保视觉和交互效果符合设计要求。
        - **前后端联调**：根据后端接口文档，通过 axios 完成前后端的数据联调，确保数据准确展示和功能实现。
        - **协作开发**：与后端开发团队紧密合作，确保前后端接口的有效对接，使前后端功能实现无缝衔接。
        - **性能优化**：优化网站和平台的前端性能，包括代码优化、资源压缩、懒加载等，提高页面加载速度和用户体验。
        - **小程序开发**：开发微信小程序项目，熟悉小程序开发框架和工具，能够独立完成小程序的设计、开发和发布。
      </MagicCard>
    </section>
  );
}

export default Experience;
