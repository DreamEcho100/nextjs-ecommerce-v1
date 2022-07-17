import Tooltip from '@components/common/Tooltip';
import { trpc } from '@libs/trpc';
import AdminLayout from 'components/Layouts/admin';
import { FormEvent, Fragment, useId, useState } from 'react';

const valuesInit: () => {
	title: string;
	price: number;
	image: string;
	brand: string;
	description: string;
	status: 'VISIBLE' | 'HIDDEN';
	countInStock: number;
} = () => ({
	title: '',
	price: 0,
	image: '',
	brand: '',
	description: '',
	status: 'VISIBLE',
	countInStock: 0,
});

const CreateProduct = ({
	initValues = {},
}: {
	initValues?: Partial<ReturnType<typeof valuesInit>>;
}) => {
	const createProductMutation = trpc.useMutation(['products.createProduct']);

	const fields1Id = useId();
	const [values, setValues] = useState({
		...valuesInit(),
		...initValues,
	});

	const fields1 = [
		{
			label: 'title',
			input: {
				id: fields1Id + 'title',
				name: 'title',
			},
		},
		{
			label: 'description',
			textarea: {
				id: fields1Id + 'description',
				name: 'description',
			},
		},
		{
			label: 'image',
			input: {
				id: fields1Id + 'image',
			},
		},
		{
			label: 'brand',
			input: {
				id: fields1Id + 'brand',
			},
		},
		{
			label: 'price',
			input: {
				id: fields1Id + 'price',
				type: 'number',
			},
		},
		{
			label: 'countInStock',
			input: {
				id: fields1Id + 'countInStock',
				type: 'number',
			},
		},
	];

	const fields2 = [
		{
			label: 'visible',
			input: {
				id: fields1Id + 'visible',
				name: 'status',
				value: 'VISIBLE',
				type: 'radio',
			},
		},
		{
			label: 'hidden',
			input: {
				id: fields1Id + 'hidden',
				name: 'status',
				value: 'HIDDEN',
				type: 'radio',
			},
		},
	];

	const handleSubmission = (event: FormEvent) => {
		event.preventDefault();

		if (createProductMutation.isLoading) return;

		createProductMutation.mutate(values);
	};

	return (
		<form
			// action="" method="post"
			onSubmit={handleSubmission}
		>
			<div className='flex'>
				<button
					type='reset'
					className='duration-150 ease-in 
		bg-gray-900 hover:bg-white hover:text-gray-900
		dark:bg-gray-700 dark:hover:text-gray-700
		 px-4 py-2 rounded-md'
					disabled={createProductMutation.isLoading}
					onClick={() => setValues(valuesInit())}
				>
					Reset Form
				</button>
				<span className='p-1'></span>
				<Tooltip
					content={`Init the form inputs to where it was at the begging ex: ${JSON.stringify(
						{ ...valuesInit, ...initValues }
					)}`}
					position='bottomCenter'
					windowCollision
				>
					<button
						type='button'
						className='duration-150 ease-in 
					bg-gray-900 hover:bg-white hover:text-gray-900
		dark:bg-gray-700 dark:hover:text-gray-700
		 px-4 py-2 rounded-md'
						disabled={createProductMutation.isLoading}
						onClick={() =>
							setValues({
								...valuesInit(),
								...initValues,
							})
						}
					>
						Init Form
					</button>
				</Tooltip>
			</div>
			<fieldset className='flex border border-gray-400 border-solid rounded-md'>
				<legend className='px-1'>status</legend>
				<div className='flex'>
					{fields2.map((field, index, arr) => (
						<Fragment key={field.label}>
							<label
								htmlFor={field.input.id}
								className='capitalize my-2 flex cursor-pointer'
							>
								<input
									type={field.input.type}
									value={field.input.value}
									name={field.input.name || field.label}
									id={field.input.id}
									onChange={(event) => {
										setValues((prev) => ({
											...prev,
											[event.target.name]:
												event.target.type === 'number'
													? parseFloat(event.target.value)
													: event.target.value,
										}));
									}}
									// value={values[(field.input.name || field.label) as keyof typeof values]}
									defaultChecked={
										!!(
											values[field.input.name as keyof typeof values] ===
											field.input.value
										)
									}
									className='mx-2'
								/>
								<span>{field.label}</span>
							</label>
							{index !== arr.length - 1 && <span className='px-2' />}
						</Fragment>
					))}
				</div>
			</fieldset>
			{fields1.map((field) => {
				if (field.textarea)
					return (
						<label
							htmlFor={field.textarea.id}
							className='capitalize my-4 block  flex-col cursor-pointer'
							key={field.label}
						>
							<p className='my-2'>{field.label}</p>
							<textarea
								name={field.textarea.name || field.label}
								id={field.textarea.id}
								onChange={(event) => {
									setValues((prev) => ({
										...prev,
										[event.target.name]: event.target.value,
									}));
								}}
								value={
									values[
										(field.textarea.name || field.label) as keyof typeof values
									]
								}
								className='px-2 py-1 rounded-sm w-full'
							/>
						</label>
					);

				return (
					<label
						htmlFor={field.input.id}
						className='capitalize my-4 block  flex-col cursor-pointer'
						key={field.label}
					>
						<p className='my-2'>{field.label}</p>
						<input
							type={field.input.type || 'text'}
							name={field.input.name || field.label}
							id={field.input.id}
							onChange={(event) => {
								setValues((prev) => ({
									...prev,
									[event.target.name]:
										event.target.type === 'number'
											? parseFloat(event.target.value)
											: event.target.value,
								}));
							}}
							value={
								values[(field.input.name || field.label) as keyof typeof values]
							}
							className='px-2 py-1 rounded-sm w-full'
						/>
					</label>
				);
			})}
			<div className='my-2'>
				<button
					type='submit'
					className='duration-150 ease-in 
				bg-gray-900 hover:bg-white hover:text-gray-900
				dark:bg-gray-700 dark:hover:text-gray-700
				 px-4 py-2 rounded-md'
					disabled={createProductMutation.isLoading}
				>
					{createProductMutation.isLoading ? 'Loading...' : 'Submit'}
				</button>
			</div>
			{createProductMutation.error && (
				<p className='my-2 bg-red-400 text-red-900 border-red-900 border p-1 rounded-sm  font-bold'>
					Something went wrong! {createProductMutation.error.message}
				</p>
			)}
			{createProductMutation.isSuccess && (
				<p className='my-2 bg-green-400 text-green-900 border-green-900 border p-1 rounded-sm  font-bold'>
					The new product is created successfully!
				</p>
			)}
		</form>
	);
};

const ProductsHome = () => {
	const [isCreateProductModalVisible, setIsCreateProductModalVisible] =
		useState(false);

	return (
		<AdminLayout>
			<main className='p-4 w-full'>
				<header>
					<h1>Products Page</h1>
				</header>
				<div>
					<button
						onClick={() => setIsCreateProductModalVisible((prev) => !prev)}
					>
						Create A new product?
					</button>
					{isCreateProductModalVisible && (
						<CreateProduct
							initValues={{
								title: '',
								price: 0,
								image: '',
								brand: '',
								description: '',
								status: 'HIDDEN',
								countInStock: 0,
							}}
						/>
					)}
				</div>
			</main>
		</AdminLayout>
	);
};

export default ProductsHome;
