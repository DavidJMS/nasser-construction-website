export const heroAdminStyles = `
    .hero-upload-card .ant-upload-select {
      width: calc((100% - 32px) / 3) !important;
      height: 200px !important;
      border-radius: 16px !important;
      background: #f8fafc !important;
      border: 2px dashed #e2e8f0 !important;
      transition: border-color 0.2s, background-color 0.2s !important;
      margin: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    .hero-upload-card .ant-upload-select:hover {
      border-color: #07427E !important;
      background: #f1f5f9 !important;
    }
    .hero-upload-card.ant-upload-wrapper .ant-upload-list-item-container {
      width: calc((100% - 32px) / 3) !important;
      height: 200px !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    .hero-upload-card.ant-upload-wrapper .ant-upload-list {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 16px !important;
    }
    .hero-upload-card.ant-upload-wrapper .ant-upload-list-item {
      width: 100% !important;
      height: 100% !important;
      border-radius: 16px !important;
      padding: 0 !important;
      border: none !important;
      background: #fff;
    }
    .hero-upload-card.ant-upload-wrapper .ant-upload-list-item-info {
      border-radius: 16px !important;
      height: 100% !important;
      width: 100% !important;
    }
    .hero-upload-card.ant-upload-wrapper .ant-upload-list-item-thumbnail {
      width: 100% !important;
      height: 100% !important;
      position: relative !important;
    }
    .hero-upload-card.ant-upload-wrapper .ant-upload-list-item-thumbnail img {
      object-fit: cover !important;
      height: 100% !important;
      width: 100% !important;
      display: block !important;
    }
    /* Hide the select box if max items reached to avoid empty dashed boxes */
    .hero-upload-card.max-reached .ant-upload-select {
      display: none !important;
    }
`
