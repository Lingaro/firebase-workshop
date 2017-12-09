const functions = require('firebase-functions');
const admin = require('firebase-admin');
const excel4node = require('excel4node');

admin.initializeApp(functions.config().firebase);

exports.userData = functions.https.onRequest((request, response) => {
    return admin.firestore()
        .collection(request.query.id)
        .doc('dataGrid')
        .get()
        .then(doc => writeExcel(doc.data(), response))
        .catch(error => response.status(500).end(JSON.stringify(error)))
});

function writeExcel(data, response) {
    const wb = new excel4node.Workbook();
    const ws = wb.addWorksheet('Sheet');
    Object.keys(data).forEach(y =>
        Object.keys(data[y]).forEach(x => {
            ws.cell(Number(x) + 1, Number(y) + 1)
                .string(data[y][x]);
        })
    );
    return wb.write('data.xlsx', response);
};
