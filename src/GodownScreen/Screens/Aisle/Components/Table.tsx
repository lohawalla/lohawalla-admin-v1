const Table = (props: any) => {
    const { tableData } = props;

    if (!Array.isArray(tableData)) {
        console.error('tableData is not an array:', tableData);
        return null;
    }
    const commonTableCell = `text-[#6B778C] border flex-wrap`
    const commonTableRow = `py-[10px] border flex-wrap`
    return (
        <table className="w-full">
            <tbody className="border">
                <tr className="bg-gray-200">
                    <td className={`${commonTableCell}`}>Sr No.</td>
                    <td className={`${commonTableCell}`}>Aisle Name</td>
                    <td className={`${commonTableCell}`}>Aisle Code</td>
                    <td className={`${commonTableCell}`}>Number of Aisle</td>
                    <td className={`${commonTableCell}`}>Created At</td>
                    <td className={`${commonTableCell}`}>Aisle Photo</td>

                </tr>
                {/* {tableData && tableData.map((row: any, index: any) => (
                    <tr key={index} className="hover:bg-[#FAFAFA] cursor-pointer">
                        <td className={`${commonTableRow}`}>{index + 1}</td>
                        <td className={`${commonTableRow} flex gap-[5px]`}>
                            <img src={row.img} alt="" />
                            {row.customerName}
                        </td>
                        <td className={`${commonTableRow}`}>{row.date}</td>
                        <td className={`${commonTableRow} text-[#21A0C3] font-bold underline cursor-pointer`}>{row.voucherNumber}</td>
                        <td className={`${commonTableRow}`}>{row.orderNumber}</td>
                        <td className={`${commonTableRow}`}>₹{row.totalAmount}</td>

                    </tr>
                ))} */}
            </tbody>
        </table>
    );
};

export default Table;