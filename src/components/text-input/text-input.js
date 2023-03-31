import React, { useEffect, useState } from 'react';
import styles from './text-input.module.scss';

function TextInput(props) {
  let name = React.createRef();
  let pass = props.regex.test(props.text);
  let [color, setColor] = useState(pass ? styles.right : styles.wrong);
  let [up, setUp] = useState(props.text === 0 ? null : styles.up);
  useEffect(() => props.onTextInput(props.text, pass))
  function handleChange() {
    let pass = props.regex.test(name.current.value);
    setColor(pass ? styles.right : styles.wrong);
    setUp(name.current.value.length === 0 ? null : styles.up);
  }
  function handleCallback() {
    let pass = props.regex.test(name.current.value);
    props.onTextInput(name.current.value, pass);
  }
  function onFocus() {
    let pass = props.regex.test(name.current.value);
    setColor(undefined);
    props.onTextInput(name.current.value, pass);
    setUp(styles.up);
  }
  return (
    <div className={styles.container}>

      <form>
        <div className={styles.group}>
          <input className={color} type="text" value={props.text} ref={name} onFocus={onFocus} onBlur={handleChange} onChange={handleCallback} />
          <span className={styles.highlight}></span>
          <span className={styles.bar}></span>
          <label className={up}>{props.label}</label>
        </div>
      </form>
    </div >
  );
}

TextInput.propTypes = {};

TextInput.defaultProps = {};

export default TextInput;
