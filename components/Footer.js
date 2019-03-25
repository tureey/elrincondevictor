import {socials} from '../config/social'

export default function Footer() {
  return (
    <footer className="container-wrapper">
      <div className="container footer-inner">
        <span>Copyright 2019 · Todos los derechos reservados</span>
        <span>Sígueme en:
          {socials.map(({name, link}) => (
            <a
              key={name}
              className='link social'
              rel="nofollow noopener noreferrer"
              target='_blank'
              href={link}>
              {name}
            </a>
          ))}
        </span>
      </div>

      <style jsx>{`
        footer {
          margin-top: 50px;
        }

        .footer-inner {
          display: flex;
          min-height: 75px;
          align-items: center;
          align-content: center;
          justify-content: space-between;
          color: var(--grey-600);
          flex-wrap: wrap;
        }

        footer a {
          padding: 5px;
          color: var(--primary-800);
        }

        footer a:visited {
          color: var(--primary-900);
        }

        span {
          display: block;
          font-size: 12px;
        }
      `}</style>
    </footer>
  )
}