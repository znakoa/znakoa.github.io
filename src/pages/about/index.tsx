import type {ReactNode} from 'react';

function About(): ReactNode {
    return (
        <div>
            <h1>关于</h1>
            <p className='bg-yellow-400'>
                苏木是一个知识笔记网站，记录个人学习、工作、生活、随笔、随想
            </p>
        </div>
    )
}

export default About;
