
# How to build and release

- Adjust version
- Clean all `rm -rf dist/`
- Build all `ng test --watch=false`
- Build all `ng build ng-static-grid`
- Commit
- Login `npm login`

## Publish ng-spring-boot-api
- `cd dist/ng-static-grid/`
- `npm publish --access public --dry-run`
- `npm publish --access public`