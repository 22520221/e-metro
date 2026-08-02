function LineTable({ lines }) {

    return (

        <div>

            <h3>Danh sách tuyến</h3>

            {
                lines.map((line) => (
                    
                    <div key={line.LineID}>

                        {line.LineName} - {line.LineColor}

                    </div>

                ))
            }

        </div>

    );

}

export default LineTable;