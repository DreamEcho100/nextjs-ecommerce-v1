import {
	useReactTable,
	getCoreRowModel,
	flexRender,
} from '@tanstack/react-table';
import { useSharedAdminDashboardState } from 'contexts/AdminDashboard';
import { useSharedAdminDashboardProductsListState } from 'contexts/AdminDashboard/Products/List';
import { useMemo } from 'react';
import { productTableDefaultColumns } from '../utils';

const ProductsMainTable = () => {
	const [
		{
			list: { data: productsListData, page },
		},
	] = useSharedAdminDashboardProductsListState();
	const [{ currentColorMode }] = useSharedAdminDashboardState();

	const data = useMemo(
		() => (productsListData[page.index] ? productsListData[page.index] : []),
		[page.index, productsListData]
	);

	const table = useReactTable({
		columns: productTableDefaultColumns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className='max-w-full overflow-x-auto'>
			<table
				className='border border-solid border-collapse'
				style={{ borderColor: currentColorMode }}
			>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr
							key={headerGroup.id}
							className='hover:bg-zinc-200 dark:hover:bg-zinc-800'
						>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className='border border-solid p-2 text-center'
									style={{
										backgroundColor: currentColorMode,
										borderColor: currentColorMode,
									}}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr
							key={row.id}
							className='hover:bg-zinc-200 dark:hover:bg-zinc-800 odd:bg-neutral-100 dark:odd:bg-neutral-900'
						>
							{row.getVisibleCells().map((cell) => (
								<td
									key={cell.id}
									className='border border-solid p-2 text-center'
									style={{ borderColor: currentColorMode }}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
				{/* <tfoot>
		{table.getFooterGroups().map(footerGroup => (
			<tr key={footerGroup.id}>
				{footerGroup.headers.map(header => (
					<th key={header.id}>
						{header.isPlaceholder
							? null
							: flexRender(
									header.column.columnDef.footer,
									header.getContext()
								)}
					</th>
				))}
			</tr>
		))}
	</tfoot> */}
			</table>
		</div>
	);
};

export default ProductsMainTable;
