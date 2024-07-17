import React from "react";
import { Table } from "flowbite-react";

const ProfitReportTabel = ({
  profitReports,
  formatNumber
}) => {
  return (
    <>
      <div className="overflow-x-auto mb-5">
        <div className="mb-5">
          <p className="font-bold">Profit Report</p>
        </div>
        <form>
          <Table>
            <Table.Head>
              <Table.HeadCell>item-name</Table.HeadCell>
              <Table.HeadCell>items-code</Table.HeadCell>
              <Table.HeadCell>Sales Revenue</Table.HeadCell>
              <Table.HeadCell>Cost Items</Table.HeadCell>
              <Table.HeadCell>Profits Item</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {profitReports && profitReports.length > 0 ? (
                <>
                  {profitReports &&
                    profitReports.map((pr, i) => (
                      <Table.Row
                        key={i}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {pr.product_name}
                        </Table.Cell>
                        <Table.Cell> {pr.product_code}</Table.Cell>
                        <Table.Cell className="text-green-500"> { formatNumber(pr.sales_revenue)} MMK</Table.Cell>
                        <Table.Cell className="text-red-500"> {formatNumber(pr.cost)} MMK</Table.Cell>
                        <Table.Cell>{formatNumber(pr.item_profit)} MMK</Table.Cell>
                      </Table.Row>
                    ))}

                  {/* <Table.Row>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>TOTAL SALES REVENUE</Table.Cell>
                    <Table.Cell>{totalSales} MMK</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>TOTAL COST</Table.Cell>
                    <Table.Cell>{totalCost} MMK</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>NET PROFIT</Table.Cell>
                    <Table.Cell>{netProfit} MMK</Table.Cell>
                  </Table.Row> */}
                </>
              ) : (
                <>
                  <Table.Row>
                    <Table.Cell colSpan={6} className="p-10 text-center">
                      <p>There is no report!</p>
                    </Table.Cell>
                  </Table.Row>
                </>
              )}
            </Table.Body>
          </Table>
        </form>
      </div>
    </>
  );
};

export default ProfitReportTabel;
