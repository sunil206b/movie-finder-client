import React from 'react';

function Input({
	type,
	name,
	placeholder,
	value,
	handleChange,
	divClass,
	className,
	errorDiv,
	errorMsg
}) {
	return (
		<div className={divClass}>
			<input
				type={type}
				className={`form-control ${className}`}
				id={name}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
			/>
			<label htmlFor={name}>{placeholder}</label>
			<div className={errorDiv}>{errorMsg}</div>
		</div>
	);
}

export default Input;
