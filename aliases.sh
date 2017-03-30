PROJECT_DIR=$(dirname $(realpath "$0"))
alias web-ext="web-ext --source-dir=${PROJECT_DIR}/src --artifacts-dir=${PROJECT_DIR}/build"
alias clean="rm -r ${PROJECT_DIR}/build"
