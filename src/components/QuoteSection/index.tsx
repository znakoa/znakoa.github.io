import {BoxReveal} from "@site/src/components/ui/boxreveal";

export default function QuoteSection():JSX.Element  {
    return (
        <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
            <div className="container">
                <div className="max-w-4xl mx-auto text-center">
                    <BoxReveal duration={0.5}>
                        <blockquote className="relative p-12">
                            <div className="text-6xl text-blue-200 absolute top-0 left-0">
                                "
                            </div>
                            <p className="text-2xl md:text-3xl text-gray-700 italic mb-6">
                                青春不是年华，而是心境；青春不是桃面，丹唇，柔膝，而是深沉的意志，恢宏的想象，炙热的感情。
                            </p>
                            <footer className="text-lg text-gray-600">— 塞缪尔·厄尔曼</footer>
                            <div className="text-6xl text-blue-200 absolute bottom-0 right-0">
                                "
                            </div>
                        </blockquote>
                    </BoxReveal>
                </div>
            </div>
        </section>
    )
}