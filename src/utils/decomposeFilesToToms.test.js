import decomposeFilesToToms from "./decomposeFilesToToms"

test("creating file dir", () => {
  expect(
    decomposeFilesToToms([
      "file:/foo/bar/first",
      "file:/foo/bar/second",
      "file:/foo/bar/firstFolder/one",
      "file:/foo/bar/firstFolder/two",
      "file:/foo/bar/firstFolder/three"
    ])
  ).toEqual([
    {
      key: "/foo/bar/first",
      title: "first",
      isLeaf: true,
      children: []
    },
    {
      key: "/foo/bar/second",
      title: "second",
      isLeaf: true,
      children: []
    },
    {
      key: "/foo/bar/firstFolder",
      title: "firstFolder",
      isLeaf: false,
      children: [
        {
          key: "/foo/bar/firstFolder/one",
          title: "one",
          isLeaf: true,
          children: []
        },
        {
          key: "/foo/bar/firstFolder/two",
          title: "two",
          isLeaf: true,
          children: []
        },
        {
          key: "/foo/bar/firstFolder/three",
          title: "three",
          isLeaf: true,
          children: []
        }
      ]
    }
  ])
})
