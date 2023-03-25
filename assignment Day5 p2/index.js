const helper = require('./helper');
 
function prepareData(data) {
    const prepareData = data.reduce((prev, elm) => {
        const [key, value] = elm.split('=');
        prev[key] = value;
        return prev;

    }, {});
    return prepareData;
}
 
function  main(cmdArgs) {
    console.log(cmdArgs);
    const[,,operation, ...data]=cmdArgs;
    const preparedData=prepareData(data);
switch (operation){
    case "add":
        helper.add(preparedData)
        break;
    case "edit":
    helper.edit(preparedData)
        break;
    case "list":
        helper.list(data)
        break;
    case 'remove':
    helper.remove(preparedData);
        break;
    
    case 'check':
    console.log("hhhh");
    helper.checked(preparedData)
        break;
    
    case 'uncheck':
    helper.unchecked(preparedData)
        break;
    }
}
main(process.argv)