import {BoxReveal} from "@site/src/components/ui/boxreveal";
import {motion} from "motion/react";
import Link from "@docusaurus/Link";

export default function ContactSection() {
    const contacts = [
        {
            icon: '📧',
            title: '邮件',
            value: 'contact@example.com',
            link: 'mailto:contact@example.com',
        },
        {
            icon: '💬',
            title: '微信',
            value: 'WeChat_ID',
            link: '#',
        },
        {
            icon: '🌟',
            title: 'GitHub',
            value: 'github.com/username',
            link: 'https://github.com/username',
        },
        {
            icon: '📝',
            title: '博客',
            value: '技术博客',
            link: '/blog',
        },
    ]

    return (
        <section className="py-16 bg-white">
            <div className="container">
                <BoxReveal duration={0.5}>
                    <h2 className="text-3xl font-bold text-center mb-12">保持联系</h2>
                </BoxReveal>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {contacts.map((contact, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center p-6 rounded-lg bg-white">
                            <Link
                                to={contact.link}
                                className="flex flex-col items-center [&:hover]:no-underline [&]:no-underline [&]:text-current">
                                <div className="text-4xl mb-3">{contact.icon}</div>
                                <h3 className="text-lg font-semibold mb-1">{contact.title}</h3>
                                <p className="text-gray-600 text-sm text-center">
                                    {contact.value}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}