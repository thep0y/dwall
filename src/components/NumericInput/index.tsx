import { createEffect, type Component } from "solid-js";
import styles from "./index.module.scss";
import { LazyInput } from "~/lazy";
import type { NumericInputProps } from "./types";
import useNumericInputHandling, { numberValidation } from "./useNumericInput";
import InputContainer from "./InputContainer";

const NumericInput: Component<NumericInputProps> = (props) => {
  const {
    inputValue,
    warning,
    handleBlur,
    handleInput,
    handleChange,
    setInputValue,
    setWarning,
    tooSmallMessage,
    tooLargeMessage,
  } = useNumericInputHandling(props);

  createEffect(() => {
    if (props.value !== undefined) {
      const { message, value } = numberValidation.validateRange(
        props.value,
        {
          value: props.min,
          warning: tooSmallMessage,
        },
        {
          value: props.max,
          warning: tooLargeMessage,
        },
      );
      setWarning(message);
      setInputValue(value.toString());
    }
  });

  return (
    <InputContainer
      label={props.label}
      required={props.required}
      warning={warning()}
    >
      <div>
        <LazyInput
          type="text"
          value={inputValue()}
          onInput={handleInput}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={props.placeholder}
          disabled={props.disabled}
          required={props.required}
          class={styles.input}
          size={props.size}
          appearance={props.appearance}
          style={props.style}
          autofocus={props.autofocus}
          contentAfter={props.contentAfter}
        />
      </div>
    </InputContainer>
  );
};

export default NumericInput;
