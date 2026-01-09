// src/components/article-params-form/ArticleParamsForm.tsx

import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import clsx from 'clsx'; // ← Добавляем импорт clsx

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	fontSizeOptions,
	contentWidthArr,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	// Обработчик клика вне формы
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				formRef.current &&
				!formRef.current.contains(event.target as Node) &&
				isOpen
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleOpen = () => {
		setIsOpen(!isOpen);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleApply = () => {
		onApply(formState);
		handleClose();
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset();
		handleClose();
	};

	const handleFormReset = (e: React.FormEvent) => {
		e.preventDefault();
		handleReset();
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleApply();
	};

	const handleChange = (field: keyof ArticleStateType) => (value: any) => {
		setFormState((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleOpen} />
			<aside
				ref={formRef}
				// ЗАМЕНА: используем clsx вместо конкатенации строк
				className={clsx(
					styles.container,
					{ [styles.container_open]: isOpen } // ← условие с использованием объекта
				)}
				style={{
					transform: isOpen ? 'translate(0)' : 'translate(-616px)',
					transition: 'transform 0.5s ease',
				}}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>

					<Separator />

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>

					<Separator />

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>

					<Separator />

					<RadioGroup
						title='Ширина контента'
						name='contentWidth'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
