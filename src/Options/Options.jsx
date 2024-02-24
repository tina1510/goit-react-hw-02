import css from './Options.module.css'
const Options = ({ onTrack, children }) => {
    return (
    <>
            <button className={css.option} onClick={onTrack} > {children}</button>
      
    </>
)}

    export default Options;

