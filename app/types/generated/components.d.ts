import type { Schema, Struct } from '@strapi/strapi';

export interface LocationAddress extends Struct.ComponentSchema {
  collectionName: 'components_location_addresses';
  info: {
    description: 'Physical address information';
    displayName: 'Address';
  };
  attributes: {
    city: Schema.Attribute.String & Schema.Attribute.Required;
    country: Schema.Attribute.String & Schema.Attribute.DefaultTo<'USA'>;
    state: Schema.Attribute.String & Schema.Attribute.Required;
    street: Schema.Attribute.String & Schema.Attribute.Required;
    zipCode: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LocationBusinessHours extends Struct.ComponentSchema {
  collectionName: 'components_location_business_hours';
  info: {
    description: 'Operating hours for each day';
    displayName: 'Business Hours';
  };
  attributes: {
    closeTime: Schema.Attribute.Time;
    day: Schema.Attribute.Enumeration<
      [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ]
    > &
      Schema.Attribute.Required;
    isClosed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    openTime: Schema.Attribute.Time;
  };
}

export interface SectionsArticleContent extends Struct.ComponentSchema {
  collectionName: 'components_sections_article_contents';
  info: {
    description: 'Article section with heading and rich text content';
    displayName: 'Article Content';
    icon: 'file-alt';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    featuredImage: Schema.Attribute.Media<'images'>;
    heading: Schema.Attribute.String;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SectionsCoreValue extends Struct.ComponentSchema {
  collectionName: 'components_sections_core_values';
  info: {
    description: 'Individual core value with title and description';
    displayName: 'Core Value';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.RichText & Schema.Attribute.Required;
    icon: Schema.Attribute.String;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsDoctorProfile extends Struct.ComponentSchema {
  collectionName: 'components_sections_doctor_profiles';
  info: {
    description: 'Profile section for individual doctors with complete bio';
    displayName: 'Doctor Profile';
    icon: 'user-md';
  };
  attributes: {
    badges: Schema.Attribute.JSON;
    bio: Schema.Attribute.RichText & Schema.Attribute.Required;
    education: Schema.Attribute.Text;
    lifestyleImage: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    profileImage: Schema.Attribute.Media<'images'>;
    specialties: Schema.Attribute.JSON;
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'DDS'>;
  };
}

export interface SectionsTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_sections_team_members';
  info: {
    description: 'Profile section for team members (hygienists, coordinators, etc.)';
    displayName: 'Team Member';
    icon: 'users';
  };
  attributes: {
    bio: Schema.Attribute.RichText & Schema.Attribute.Required;
    email: Schema.Attribute.Email;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    phone: Schema.Attribute.String;
    photo: Schema.Attribute.Media<'images'>;
    role: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsTextContent extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_contents';
  info: {
    description: 'Generic text content section with heading and body';
    displayName: 'Text Content';
    icon: 'align-left';
  };
  attributes: {
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
    heading: Schema.Attribute.String;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SectionsVideoEmbed extends Struct.ComponentSchema {
  collectionName: 'components_sections_video_embeds';
  info: {
    description: 'Embedded video section (YouTube, Vimeo, etc.)';
    displayName: 'Video Embed';
    icon: 'video';
  };
  attributes: {
    description: Schema.Attribute.Text;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    platform: Schema.Attribute.Enumeration<['YouTube', 'Vimeo', 'Other']> &
      Schema.Attribute.DefaultTo<'YouTube'>;
    thumbnail: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    videoUrl: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMetaSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_socials';
  info: {
    description: 'Social media metadata';
    displayName: 'Meta Social';
    icon: 'share-alt';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    image: Schema.Attribute.Media<'images'>;
    socialNetwork: Schema.Attribute.Enumeration<
      ['Facebook', 'Twitter', 'LinkedIn', 'Instagram']
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Search Engine Optimization metadata';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaSocial: Schema.Attribute.Component<'shared.meta-social', true>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'location.address': LocationAddress;
      'location.business-hours': LocationBusinessHours;
      'sections.article-content': SectionsArticleContent;
      'sections.core-value': SectionsCoreValue;
      'sections.doctor-profile': SectionsDoctorProfile;
      'sections.team-member': SectionsTeamMember;
      'sections.text-content': SectionsTextContent;
      'sections.video-embed': SectionsVideoEmbed;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
    }
  }
}
