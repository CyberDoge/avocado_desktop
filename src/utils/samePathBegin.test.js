import samePathBegin from "./samePathBegin"

test("get folder name starts with a file path unix", () => {
  const t = samePathBegin
  expect(t("/foo/biz/baz", "/foo/biz/baz")).toBe("/foo/biz/baz")
  expect(t("/foo/biz/baz", "/foo/biz/baz/asd")).toBe("/foo/biz/baz")
  expect(t("/", "/foo/biz/baz")).toBe("/")
  expect(t("/foo/biz/biz/baz", "/foo/biz/baz")).toBe("/foo/biz")
  expect(t("/biz/baz", "/foo/biz/baz")).toBe("/")
  expect(t("/foo/biz/baz/baz/baz/baz", "/foo/biz/baz/baz/baz/baz/iii")).toBe(
    "/foo/biz/baz/baz/baz/baz"
  )
  expect(t("/foo/biz/baz/baz/baz/baz", "/foo/biz/baz/baz/baz")).toBe(
    "/foo/biz/baz/baz/baz"
  )
  expect(
    t(
      "/foo/biz/baz/foo/biz/baz/baz/baz/baz",
      "/foo/biz/baz/foo/biz/baz/baz/baz/baz/asd"
    )
  ).toBe("/foo/biz/baz/foo/biz/baz/baz/baz/baz")
  expect(
    t(
      "/foo/biz/baz/foo/space/biz/baz/baz/baz/baz",
      "/foo/biz/baz/foo/biz/baz/baz/baz/baz/asd"
    )
  ).toBe("/foo/biz/baz/foo")
  expect(t("/foo/biz/baz/foo/biz/baz/baz/baz/baz", "/foo/biz/baz/asd")).toBe(
    "/foo/biz/baz"
  )
  expect(t("/foo/biz/baz/foo/biz/baz/baz/baz/baz", "/foo/biz/baz")).toBe(
    "/foo/biz/baz"
  )
})

test("get folder name starts with a file path windows", () => {
  const t = samePathBegin
  expect(t("\\foo\\biz\\baz", "\\foo\\biz\\baz")).toBe("/foo/biz/baz")
  expect(t("\\foo\\biz\\baz", "\\foo\\biz\\baz\\asd")).toBe("/foo/biz/baz")
  expect(t("\\", "\\foo\\biz\\baz")).toBe("/")
  expect(t("\\foo\\biz\\biz\\baz", "\\foo\\biz\\baz")).toBe("/foo/biz")
  expect(t("\\biz\\baz", "\\foo\\biz\\baz")).toBe("/")
  expect(
    t("\\foo\\biz\\baz\\baz\\baz\\baz", "\\foo\\biz\\baz\\baz\\baz\\baz\\iii")
  ).toBe("/foo/biz/baz/baz/baz/baz")
  expect(t("\\foo\\biz\\baz\\baz\\baz\\baz", "\\foo\\biz\\baz\\baz\\baz")).toBe(
    "/foo/biz/baz/baz/baz"
  )
  expect(
    t(
      "\\foo\\biz\\baz\\foo\\biz\\baz\\baz\\baz\\baz",
      "\\foo\\biz\\baz\\foo\\biz\\baz\\baz\\baz\\baz\\asd"
    )
  ).toBe("/foo/biz/baz/foo/biz/baz/baz/baz/baz")
  expect(
    t(
      "\\foo\\biz\\baz\\foo\\space\\biz\\baz\\baz\\baz\\baz",
      "\\foo\\biz\\baz\\foo\\biz\\baz\\baz\\baz\\baz\\asd"
    )
  ).toBe("/foo/biz/baz/foo")
  expect(
    t("\\foo\\biz\\baz\\foo\\biz\\baz\\baz\\baz\\baz", "\\foo\\biz\\baz\\asd")
  ).toBe("/foo/biz/baz")
  expect(
    t("\\foo\\biz\\baz\\foo\\biz\\baz\\baz\\baz\\baz", "\\foo\\biz\\baz")
  ).toBe("/foo/biz/baz")
})
