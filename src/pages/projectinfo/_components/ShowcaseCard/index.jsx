import React from 'react'
import Link from '@docusaurus/Link'

import styles from './styles.module.css'
import clsx from 'clsx'

function ShowCaseCard(props) {
    return (
        <article className="card shadow--md" style={{ height: '100%' }}>
            <div className={clsx('card__image', styles.cardImageWrapper)}>
                <img
                    src={props.preview}
                    alt={props.title}
                    title={props.title}
                    className={styles.cardImage}
                />
            </div>
            <div className="card__body">
                <Link to={props.website}>
                    <h4>{props.title}</h4>
                </Link>
                <p className={styles.description}>{props.description}</p>
            </div>
            <div className="card__footer">
                <section className="margin-bottom--md">
                    {props.tags.map((item) => (
                        <span key={item} className="badge badge--info margin-right--xs">
              {item}
            </span>
                    ))}
                </section>
                <div className="button-group button-group--block">
                    {props.website && (
                        <button
                            className="button button--primary button--block"
                            onClick={() => window.open(props.website)}>
                            访问
                        </button>
                    )}
                    {props.source && (
                        <button
                            className="button button--secondary button--block"
                            onClick={() => window.open(props.source)}>
                            源码
                        </button>
                    )}
                </div>
            </div>
        </article>
    )
}

export default ShowCaseCard
