import css from '../style/Select.module.css';

const Select = ({children}) => {
  return (
    <div className={css.select}>
        <select>
            { children }
        </select>
    </div>
  )
}

export default Select