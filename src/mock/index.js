import mock from "mockjs";
mock.mock(/\/api\/getRecipe/, "get", {
  code: 200,
  "data|20": [
    {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    },
  ],
});