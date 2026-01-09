// src/components/radio-group/Option.tsx

import { useRef } from 'react';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { useEnterSubmit } from './hooks/useEnterSubmit';
import styles from './RadioGroup.module.scss';

type OptionProps = {
	selected: OptionType;
	groupName: string;
	onChange?: (option: OptionType) => void;
	option: OptionType;
};

export const Option = (props: OptionProps) => {
	const { selected, groupName, onChange, option } = props;

	const optionRef = useRef<HTMLDivElement>(null);
	const handleChange = () => {
		console.log('Option clicked:', option);
		onChange?.(option);
	};

	useEnterSubmit({ onChange, option });

	const inputId = `${groupName}_radio_item_with_value__${option.value}`;
	const isChecked = option.value === selected.value;

	console.log('Option debug:', {
		title: option.title,
		optionValue: option.value,
		selectedValue: selected.value,
		isChecked,
	});

	return (
		<div
			className={styles.item}
			key={option.value}
			data-checked={isChecked}
			data-testid={inputId}
			tabIndex={0}
			ref={optionRef}
			style={isChecked ? { outline: '2px solid red' } : undefined} // временно для отладки
		>
			<input
				className={styles.input}
				type='radio'
				name={groupName}
				id={inputId}
				value={option.value}
				checked={isChecked}
				onChange={handleChange}
				tabIndex={-1}
			/>
			<label className={styles.label} htmlFor={inputId}>
				<Text size={18} uppercase>
					{option.title} {isChecked && ' ✓'}
				</Text>
			</label>
		</div>
	);
};
