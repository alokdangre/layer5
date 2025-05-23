import React from "react";
import BlogViewToolTip from "../../../components/blog-view-tooltip";
import { Container, Row, Col } from "../../../reusecore/Layout";
import PageHeader from "../../../reusecore/PageHeader";
import Sidebar from "../Blog-sidebar";
import Card from "../../../components/Card";
import { BlogPageWrapper } from "./blogList.style";
import RssFeedIcon from "../../../assets/images/socialIcons/rss-sign.svg";
import Pagination from "../../Resources/Resources-grid/paginate";
import SearchBox from "../../../reusecore/Search";

const BlogList = ({
  isListView,
  setListView,
  setGridView,
  pageContext,
  currentPage,
  searchQuery,
  searchData,
  setCurrentPage,
  queryResults,
  postsPerPage,
  searchedPosts,
}) => {
  const category = pageContext.category ? pageContext.category : null;
  const tag = pageContext.tag ? pageContext.tag : null;
  const totalCount = queryResults.length;
  const header = tag
    ? `${totalCount} post${totalCount === 1 ? "" : "s"} tagged with "${tag}"`
    : category
      ? `${totalCount} post${totalCount === 1 ? "" : "s"
      } categorized as "${category}"`
      : "Blog";

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <BlogPageWrapper>
      <PageHeader
        title={header}
        path="Blog"
        img={RssFeedIcon}
        feedlink="/blog/feed.xml"
      />
      <div className="blog-page-wrapper">
        <Container>
          <Row style={{
            flexWrap: "wrap"
          }}>
            <Col $xs={12} $lg={8}>
              {!pageContext.tag && !pageContext.category ? (
                <div className="tooltip-search">
                  <BlogViewToolTip
                    isListView={isListView}
                    setListView={setListView}
                    setGridView={setGridView}
                  />
                  <SearchBox
                    searchQuery={searchQuery}
                    searchData={searchData}
                    paginate={paginate} currentPage={currentPage}
                    focusSearch={true}
                  />
                </div>
              ) : (
                <SearchBox searchQuery={searchQuery} searchData={searchData} paginate={paginate} currentPage={currentPage} focusSearch={true} />
              )}
              <div className="blog-list-wrapper">
                <Row style={{
                  flexWrap: "wrap"
                }}
                className="blog-lists">
                  {searchedPosts.length > 0 &&
                    searchedPosts?.map(({ id, frontmatter, fields }) => (
                      <Col $xs={12} key={id}>
                        <Card frontmatter={frontmatter} fields={fields} />
                      </Col>
                    ))}
                  <Col>
                    {searchedPosts.length > 0 && (
                      <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={queryResults.length}
                        currentPage={currentPage}
                        paginate={paginate}
                      />
                    )}
                  </Col>
                </Row>
              </div>
            </Col>
            <Col $xs={12} $lg={4}>
              <Sidebar pageContext={pageContext} />
            </Col>
          </Row>
        </Container>
      </div>
    </BlogPageWrapper>
  );
};

export default BlogList;
