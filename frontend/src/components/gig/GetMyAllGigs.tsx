import { Button, Card, Col, Empty, Row, Space, Tag, Typography, Image, Tooltip } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  StarFilled,
  ShoppingCartOutlined,
  MessageOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useAppSelector } from '@/hooks/useAppDispatchSelector';
import { useDeleteGigMutation, useGetAllMyGigsQuery } from '@/features/gig/gigApi';
import { useNavigate } from 'react-router';
import confirm from 'antd/es/modal/confirm';
import toast from 'react-hot-toast';

const { Title, Text, Paragraph } = Typography;

function GetMyAllGigs() {
  const providerId = useAppSelector((state) => state.auth.user?._id);

  const { data, isLoading } = useGetAllMyGigsQuery(providerId ?? '', {
    skip: !providerId,
  });

  const [deleteGigApi] = useDeleteGigMutation();

  const gigs = data?.data ?? [];

  const navigate = useNavigate();

  const handleDeleteGig = (id: string) => {
    confirm({
      title: 'Delete Gig',
      content: 'Are you sure you want to delete this Gig?',
      okText: 'Delete',
      cancelText: 'Cancel',
      okCancel: true,
      okType: 'danger',
      centered: true,

      async onOk() {
        try {
          await deleteGigApi(id).unwrap();
          toast.success('Gig deleted successfully');
        } catch (error: any) {
          toast.error('Failed to delete gig');
        }
      },
    });
  };

  if (isLoading) {
    return <div className="p-4">Loading gigs...</div>;
  }

  return (
    <div className="w-full px-3 sm:px-5 lg:px-8 py-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <Title level={2} style={{ marginBottom: 0 }}>
            My Gigs
          </Title>

          <Text type="secondary">Manage, edit and monitor all your gigs.</Text>
        </div>

        <Tooltip title={gigs.length >= 2 ? 'Maximum 2 gigs are allowed' : null}>
          <span>
            <Button
              type="primary"
              size="large"
              disabled={gigs.length >= 2}
              icon={<PlusOutlined />}
              onClick={() => navigate('/provider/create-gig')}
              className="w-full sm:w-auto"
            >
              Create Gig
            </Button>
          </span>
        </Tooltip>
      </div>

      {/* Empty */}
      {gigs.length === 0 ? (
        <Empty description="No gigs found" />
      ) : (
        <Row gutter={[0, 20]}>
          {gigs.map((gig) => (
            <Col span={24} key={gig._id}>
              <Card
                hoverable
                className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                styles={{
                  body: {
                    padding: 16,
                  },
                }}
              >
                <div className="flex flex-col md:flex-row gap-5">
                  {/* Image */}
                  <div className="w-full md:w-[220px] md:min-w-[220px]">
                    <Image
                      preview={false}
                      src={gig.avatar?.url}
                      alt={gig.title}
                      width="100%"
                      height={180}
                      className="rounded-lg object-cover"
                      fallback="https://placehold.co/220x180?text=No+Image"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    {/* Title + Status */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div className="min-w-0">
                        <Title level={4} ellipsis={{ rows: 2 }} style={{ marginBottom: 5 }}>
                          {gig.title}
                        </Title>

                        <Text strong style={{ fontSize: 16 }}>
                          {gig.startingPrice ? `${gig.startingPrice} PKR` : 'Contact for Price'}
                        </Text>
                      </div>

                      <Tag
                        color={gig.status === 'published' ? 'success' : 'warning'}
                        style={{
                          padding: '5px 14px',
                          fontSize: 14,
                          width: 'fit-content',
                        }}
                      >
                        {gig.status.toUpperCase()}
                      </Tag>
                    </div>

                    {/* Description */}
                    <Paragraph
                      ellipsis={{ rows: 2 }}
                      style={{
                        marginTop: 12,
                        marginBottom: 18,
                      }}
                    >
                      {gig.description}
                    </Paragraph>

                    {/* Stats */}
                    <Space size="middle" wrap className="mb-5">
                      <Text>
                        <StarFilled
                          style={{
                            color: '#faad14',
                            marginRight: 5,
                          }}
                        />
                        {gig.rating}
                      </Text>

                      <Text>
                        <ShoppingCartOutlined style={{ marginRight: 5 }} />
                        {gig.totalOrders} Orders
                      </Text>

                      <Text>
                        <MessageOutlined style={{ marginRight: 5 }} />
                        {gig.totalReviews} Reviews
                      </Text>
                    </Space>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-auto">
                      <Button
                        icon={<EyeOutlined />}
                        onClick={() => navigate(`/provider/gig/details/${gig._id}`)}
                        className="w-full sm:w-auto"
                      >
                        View
                      </Button>

                      <Button type="primary" icon={<EditOutlined />} className="w-full sm:w-auto">
                        Edit
                      </Button>

                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteGig(gig._id)}
                        className="w-full sm:w-auto"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default GetMyAllGigs;
