import PropTypes from 'prop-types';

const ButtonPrimary = ({
  href,
  target = '_self',
  label,
  icon,
  classes
}) => {
  const baseClasses = `inline-flex items-center gap-2 px-6 py-2 rounded-2xl font-medium 
    bg-[#e84242] text-white hover:bg-[#c73434] transition-colors duration-300 shadow-lg
    ${classes || ''}`;

  if (href) {
    return (
      <a href={href} target={target} className={baseClasses}>
        {label}
        {icon &&
          <span className="material-symbols-rounded text-xl" aria-hidden="true">
            {icon}
          </span>
        }
      </a>
    );
  } else {
    return (
      <button className={baseClasses}>
        {label}
        {icon &&
          <span className="material-symbols-rounded text-xl" aria-hidden="true">
            {icon}
          </span>
        }
      </button>
    );
  }
};

ButtonPrimary.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  icon: PropTypes.string,
  classes: PropTypes.string
};

const ButtonOutline = ({
  href,
  target = '_self',
  label,
  icon,
  classes
}) => {
  const baseClasses = `inline-flex items-center gap-2 px-6 py-2 rounded-2xl font-medium 
    border border-white/40 text-white hover:bg-white hover:text-[#e84242] 
    transition-all duration-300 shadow-md
    ${classes || ''}`;

  if (href) {
    return (
      <a href={href} target={target} className={baseClasses}>
        {label}
        {icon &&
          <span className="material-symbols-rounded text-xl" aria-hidden="true">
            {icon}
          </span>
        }
      </a>
    );
  } else {
    return (
      <button className={baseClasses}>
        {label}
        {icon &&
          <span className="material-symbols-rounded text-xl" aria-hidden="true">
            {icon}
          </span>
        }
      </button>
    );
  }
};

ButtonOutline.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  icon: PropTypes.string,
  classes: PropTypes.string
};

export {
  ButtonPrimary,
  ButtonOutline
};
